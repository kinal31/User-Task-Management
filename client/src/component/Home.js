import React from 'react'
import logo from './UTM.png';
const Home = () => {
    return (
        <>
        
            <div className="card text-center w-50 mx-auto my-5 mb-7">
                <div className="card mx-auto" style={{width: "18rem"}}>
                <img className="card-img-top" src={logo} alt="Card image cap" />
                </div>
                {/* <div className="card-header">
                    Description about this website
                </div> */}
                <div className="card-body">
                    <h5 className="card-title">User Task Mangement</h5>
                    <p className="card-text">The management of users and their assigned tasks within a specific department is the focus of this website. We can add new users to this website and assign them new tasks as well. Additionally, we are able to view every aspect of the users and their assignments.</p>

                </div>

            </div>
            
        </>
    )
}

export default Home
