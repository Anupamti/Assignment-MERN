import React, { useState } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap';
import { ScreenOne } from '../navbar/screeone';
import Screentwo from '../screentwo/screentwo';

function Home() {
    const [isScreen, setIsScreen] = useState("ScreenOne")

    return (
        <div>
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink onClick={() => setIsScreen("ScreenOne")} active={isScreen === "ScreenOne" ? true : false}>Screen One</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={() => setIsScreen("ScreenTwo")} active={isScreen === "ScreenTwo" ? true : false}> Screen Two</NavLink>
                    </NavItem>
                </Nav>
            </div>
            {
                isScreen === "ScreenOne" ? (
                    <>
                        <ScreenOne />
                    </>
                ) : (
                    isScreen === "ScreenTwo" && (
                        <>
                            <Screentwo />
                        </>
                    )
                )


            }
        </div>
    )
}

export default Home
