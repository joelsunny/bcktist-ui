import React from 'react'
import './css/list.css'

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
            items : ['buy milk', 'onions', 'tomato 1kg', 'reeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaallly long']
        }
    }

    HandleItemAddition() {
        
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
                                list input here
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
                </div>
                <div className="list-body-wrapper">
                    {main_body}
                </div>
            </div>
        )
    }
}

export default List;