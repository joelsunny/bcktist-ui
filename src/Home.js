import React from 'react'
import './css/home.css'
const categories = ['grocery', 'work', 'gym'];

function AddCategory(props) {
    return(
        <div className="category">
            <div className="category-input">
                <div className="list-input">
                    <input className="list-input" type="text" placeholder="  list name"/>
                </div>
                <div>
                    <button className="plus-button">+</button>
                </div>
            </div>
        </div>
    )
    
}

function CreateCategory(props) {
    return(
        <div className="category">
            <button className="plus-button">+</button>
            <p>new todo list</p>
        </div>
    )
}

function CategoryInfo(props) {
    return(
        <div className="category-list">
            <div className="category"> <p> grocery </p> </div>
            <div className="category"> <p> work </p> </div>
            <div className="category"> <p> gym </p> </div>
            <div className="category"> <p> grocery </p> </div>
            <div className="category"> <p> work </p> </div>
            <div className="category"> <p> gym </p> </div>
            <div className="category"> <p> gym </p> </div>
            <CreateCategory />
        </div>
    )
}

class UserHome extends React.Component {
    render() {
        return(
            <div className="home-screen">
                <div className="title-bar">
                    <div className="title">
                        <div className="app-info-home">
                            <h1 className="app-name-home"> bcktlist </h1>
                            <div className="motto-wrapper-home">
                                <div className="motto-chckbox-home">
                                    <input type="checkbox" checked /> 
                                </div>
                                <p className="motto-home"> organize your life </p>
                            </div>
                         </div>
                    </div>
                    <div className="account-info">
                        account info
                    </div>
                </div>

                <div className="home-body">

                    <CategoryInfo />

                </div>

            </div>
        )
    }
}

export default UserHome;