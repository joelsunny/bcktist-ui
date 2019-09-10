import React from 'react'
import './css/home.css'
import List from './List'
import base_url from './globals'
import Auth from './Auth'

class CreateCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mode : 'default'
        };

        this.renderView = this.renderView.bind(this);
        this.PromptCategoryCreation = this.PromptCategoryCreation.bind(this);
        this.HandleSubmit = this.HandleSubmit.bind(this);

    };

    HandleSubmit(event) {
        // send post request to API, if success, change the parent state and change back to default view
        console.log('handling category creation');
        let new_category = document.getElementById("cat-input").value;
        if (new_category === "") {
            return
        }
        this.setState(() => {
            return(
                {mode:'default'}
            )
        });

        this.props.Handler(new_category);

    }

    AddCategory() {
        let view = <div className="category">
                        <div className="category-input">
                            <div className="list-input">
                                <input id="cat-input" className="list-input" type="text" placeholder="  list name"/>
                            </div>
                            <div>
                                <button className="plus-button" onClick={this.HandleSubmit}>+</button>
                            </div>
                        </div>
                    </div>;
        return(view)
        
    }

    PromptCategoryCreation(event) {
        this.setState(() => {
            return({mode :'prompt'})
        });
    }

    renderView() {
        let default_view = <div className="category">
                            <button className="plus-button" onClick={this.PromptCategoryCreation}>+</button>
                            <p>new todo list</p>
                        </div>;
        let create_prompt = this.AddCategory()

        let view;
        if(this.state.mode === 'default') {
            view = default_view;
        } else {
            view = create_prompt;
        }

        return view;
    };
    
    render() {
        return(
            <>
                {this.renderView()}
            </>
        );
    };
    
}

function CategoryInfo(props) {

    const category_list = props.categories.map((item) => <div onClick={() => { props.ClickHandler(item)} } className="category"> <p> {item} </p> </div>); 

    return(
        <div className="category-list">
            {category_list}
            <CreateCategory Handler={props.Handler}/>
        </div>
    )
}

class UserHome extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            view : 'home',
            categories : [],
            selected: null
        }

        this.categoryCreationHandler = this.categoryCreationHandler.bind(this);
        this.viewHandler = this.viewHandler.bind(this);
        this.backButtonHandler = this.backButtonHandler.bind(this);
        this.getCategoryInfo = this.getCategoryInfo.bind(this);

        this.getCategoryInfo();
    }
    
    async getCategoryInfo() {
        // function to fetch the user's categories from backend
        const url = base_url + 'list';
        console.log('url = ' +  url);
        let res = await fetch(url, {
            method: 'GET',
            headers:{
              'access_token': Auth.getAccessToken()
            }
          });
        console.log(res.status);
        if(res.status === 403 ) {
            Auth.Handle_403()
            return
        };
        let res_body = await res.json();
        console.log('got response from server');
        console.log(res_body);

        this.setState(() => {
            return({
                categories : res_body
            })
        })
    }

    backButtonHandler(event) {

        console.log('back button pressed');
        this.getCategoryInfo();
        this.setState(() => {
            return(
                {
                    view : 'home',
                    selected : null
                }
            )
        })
    }

    viewHandler(item) {
        // Handle view transition from home screen to category display when
        // the user clicks a category. Passed to child component 'CategoryInfo'.

        console.log('selected ' + item);

        this.setState(() => {
            return({
                view : 'category',
                selected : item
            })
        })
    }

    async categoryCreationHandler(category) {

        const url = base_url + 'list/create';
        console.log('url = ' +  url);
        let data = {
            category: category
        };
        console.log('creating new category');
        let res = await fetch(url, {
            method: 'POST',
            headers:{
              'access_token': Auth.getAccessToken(),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          
        if(res.status === 403 ) {
            Auth.Handle_403()
            return
        };
        let res_body = await res.json();
        console.log(res_body);

        this.setState( (state) => {
            let cat_list = this.state.categories;
            cat_list.push(category);
            return({
                categories : cat_list
            });
        })
    }

    render() {

        let categry_display = <CategoryInfo categories={this.state.categories} ClickHandler={this.viewHandler} Handler={this.categoryCreationHandler}/>;
        let header = <div className="title-bar">
                        <div className="title">
                            <div className="app-info-home">
                                <h1 className="app-name-home"> bcktlist </h1>
                                <div className="motto-wrapper-home">
                                    <div className="motto-chckbox-home">
                                        <input type="checkbox" checked readOnly/> 
                                    </div>
                                    <p className="motto-home"> organize your life </p>
                                </div>
                            </div>
                        </div>
                        <div className="account-info">
                            account info
                        </div>
                    </div>;
        let home_screen =   <div className="home-screen">
                                    {header}
                                <div className="home-body">
                                    {categry_display}
                                </div>
                            </div>
        console.log(this.state);
        if(this.state.view === 'category') {
            return(
                <>
                    <List backButtonHandler={this.backButtonHandler} category={this.state.selected}/>
                </>
            )
        } else {
            return(
                <>
                    {home_screen}
                </>
            )
        }
        
    }
}

export default UserHome;