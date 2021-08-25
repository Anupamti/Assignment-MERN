import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserData, getUserDetails } from '../../Redux/action/userData';
import { Spinner } from 'reactstrap';
import { Button, Icon, Notification } from 'atomize';
function Screentwo() {
    const [userData, setUserdata] = useState()

    const dispatch = useDispatch()
    const [dataSubmited, setDataSubmited] = useState()

    const { data } = useSelector((state) => state.userDetails);

    const handelDelete = () => {
        dispatch(deleteUserData(userData._id))
        setDataSubmited(true)
        setInterval(() => {
            window.location.reload()
        }, 3000);

    }



    useEffect(() => {
        dispatch(getUserDetails());
    }, [])

    useEffect(() => {
        if (!data) {
            console.log("loading")
        }
        setUserdata(data[0])
    }, [data])


    console.log(userData, "userdata")

    return (
        <>
            {
                userData ? (
                    <div>
                        <Notification
                            bg="warning700"
                            hoverBg="warning600"
                            isOpen={dataSubmited}
                            onClose={() => setDataSubmited(false)}
                            prefix={
                                <Icon
                                    name="Success"
                                    color="white"
                                    size="18px"
                                    m={{ r: "0.5rem" }}
                                />
                            }
                        >
                            Deleted Suessfully
                        </Notification>
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Category</th>
                                    <th>Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Username</td>
                                    <td>{userData?.username}</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Mobile</td>
                                    <td>{userData?.mobile}</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>email</td>
                                    <td>{userData?.email}</td>
                                </tr>
                                <tr>
                                    <th scope="row">4</th>
                                    <td>Address</td>
                                    <td>{userData?.address}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Button
                            onClick={handelDelete}
                            h="2.5rem"
                            w="2.5rem"
                            bg="danger700"
                            hoverBg="danger600"
                            rounded="circle"
                            m={{ r: "1rem" }}
                            shadow="2"
                            hoverShadow="4"
                        >
                            <Icon name="DeleteSolid" size="20px" color="white" />
                        </Button>
                    </div>
                ) : (<div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> No Data Found<Spinner color="primary" >
                </Spinner></div>)
            }
        </>
    )
}

export default Screentwo
