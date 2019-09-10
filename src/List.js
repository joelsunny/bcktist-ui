import React from 'react'
import './css/list.css'
import base_url from './globals'
import Auth from './Auth'

function Item(props) {
    return(
        <div className="item-wrapper">
            <div className="item-text">{props.text}</div>
        </div>
    )
}

class List extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            category : props.category,
            items : []
        }

        this.deleteHandler = this.deleteHandler.bind(this);
        this.HandleItemAddition = this.HandleItemAddition.bind(this);
        this.getItemInfo()
    }

    async getItemInfo() {
        // function to fetch the user's items in a category from backend
        const url = base_url + 'list/' + this.state.category;
        console.log('url = ' +  url);
        let res = await fetch(url, {
            method: 'GET',
            headers:{
              'access_token': Auth.getAccessToken()
            }
          });
        
        let res_body = await res.json();
        console.log('got response from server');
        console.log(res_body);

        this.setState(() => {
            return({
                items : res_body
            })
        })
    }


    async HandleItemAddition() {

        const url = base_url + 'list/' + this.state.category + "/insert";
        console.log('url = ' +  url);
        let new_item = document.getElementById("added-item").value;
        if (new_item === "") {
            return
        }
        let data = {
            item: new_item
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
        
        let res_body = await res.json();
        console.log(res_body);

        // reset the input area
        document.getElementById("added-item").value = ""
        this.setState( (state) => {
            let items_list = this.state.items;
            items_list.push(new_item);
            return({
                items : items_list
            });
        })

    }

    async deleteHandler() {
        const url = base_url + 'list/delete';
        console.log('url = ' +  url);
        let data = {
            category: this.state.category
        };
        console.log(JSON.stringify(data));
        let res = await fetch(url, {
            method: 'POST',
            headers:{
              'access_token': Auth.getAccessToken(),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
        
        let res_body = await res.json();
        console.log('deleting category');
        console.log(res_body);
        // set view back to home, if delete is successfull
        this.props.backButtonHandler()
    }

    renderList() {
        let item_list = this.state.items.map((item) => <Item text={item}/>);

        return(item_list);
    }

    render() {
        console.log(this.props);
        let main_body = <div className="list-body">
                            <div className="list-display">
                                {this.renderList()}
                            </div>
                            <div className="item-input">
                                <textarea id="added-item" className="item-input-text">

                                </textarea>
                                <button className="plus-button" onClick={this.HandleItemAddition}>+</button>
                            </div>
                        </div>           
        return(
            <div className="list-screen">
                <div className="category-header">
                    <div onClick={this.props.backButtonHandler} className="back-button">
                        back button
                    </div>
                    <div className="category-name">
                        {this.state.category}
                    </div>
                    <div onClick={this.deleteHandler} className="delete-button">
                        delete
                    </div>
                </div>
                <div className="list-body-wrapper">
                    {main_body}
                </div>
            </div>
        )
    }
}

export default List;