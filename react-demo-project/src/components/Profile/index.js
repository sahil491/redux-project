import React, { useEffect, useState } from "react";
// import Jyoti from "components/picture/image.png";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SendEmail } from "actions/Auth/authActions";
import { getUser, getImage } from "actions/Auth/userActions";
import { ArrowRight } from "react-bootstrap-icons";
// import { getImage } from "actions/Auth/authActions";

// import { render } from "enzyme";

const Profile = () => {
        const user = useSelector((state) => state.user.data);
        const [file, setFile] = useState({});
        const [imgPreview, setImagePreview] = useState(null);
        const [error, setError] = useState(false);
        console.log("auth1", user);
        const [userData, setUserData] = useState({});
        const dispatch = useDispatch();
        const navigate = useNavigate();

        const handleEmail = (e) => {
            e.preventDefault();
            dispatch(SendEmail());
        };
        useEffect(() => {
            dispatch(getUser());
        }, [])

        useEffect(() => {
            setUserData({});
            dispatch(getUser());
        }, []);

        useEffect(() => {
            if (user && user.results) {
                setUserData(user.results[3]);
                user.results[5] && setImagePreview(`http://localhost:5000/${user.results[5].image}`);
            }
        }, [user]);

        // const handleImage = (e) =>{
        //   console.log("call")
        //   e.preventDefault();
        //   const selected = e.target.files[0];
        //   console.log("sel",selected)
        //   const ALLOWED_TYPE = ["image/png","image/jpeg","image/jpg"];
        //   console.log(selected.type)
        //   if(selected && ALLOWED_TYPE.includes(selected.type)){
        //     console.log("allow", ALLOWED_TYPE)
        //     const reader = new FileReader();
        //     reader.onloadend = ()=>{
        //       console.log(render.result)
        //       setImagePreview(reader.result);
        //     }
        //     reader.readAsDataURL(selected);
        //   }else{
        //     setError(true);
        //   }
        // }

        const handleImage = (e) => {
            console.log(e.target.files[0]);
            setFile(e.target.files[0]);
            const selected = e.target.files[0];
            console.log("sel", selected);
            const ALLOWED_TYPE = ["image/png", "image/jpeg", "image/jpg"];
            console.log(selected.type);
            if (selected && ALLOWED_TYPE.includes(selected.type)) {
                console.log("allow", ALLOWED_TYPE);
                const reader = new FileReader();
                reader.onloadend = () => {
                    console.log(reader.result);
                    setImagePreview(reader.result);
                };
                reader.readAsDataURL(selected);
            } else {
                setError(true);
            }
            console.log("file", file);
            // console.log("userData",userData)
            //  dispatch(getImage(userData))
        };
        const onFormSubmit = (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append("file", file);
            // setFile(file)
            dispatch(getImage(userData.id, formData));
            // dispatch(getImage())
        };

        const onCancel = () => {
            navigate("/userview");
        };
        return ( <
            >
            <
            Container >
            <
            Row style = {
                { marginTop: "100px" } } > {
                error && < p className = "errmsg" > File not supporeted < /p>} <
                Col md = {
                    { span: 6, offset: 3 } } >
                <
                div
                style = {
                    { border: "0.5px solid black ", borderRadius: "20px" } }
                className = "shadow p-5 mb-5 bg-white " >
                <
                form onSubmit = { onFormSubmit } >
                <
                div
                className = "imagePreview"
                // style={{
                //   background:  imgPreview
                //   ? `url("${imgPreview}") no-repeat center/cover`
                //   :"#131313"
                // }}
                >
                <
                div className = "col-md-4" >
                <
                img
                src = { imgPreview }
                style = {
                    { borderRadius: "100px", marginLeft: "140px" } }
                height = "150px"
                width = "150px"
                alt = "sahil" /
                >
                <
                /div> <
                /div> <
                Row style = {
                    { marginTop: "10px" } } >

                <
                label
                style = {
                    { width: "135px", marginLeft: "150px" } }
                htmlFor = "fileUpload"
                className = "btn btn-primary" >
                Change Profile <
                /label> <
                input
                style = {
                    { display: "none" } }
                id = "fileUpload"
                name = "file"
                type = "file"
                onChange = { handleImage } >
                < /input> <
                div >
                <
                button className = "btn btn-info"
                type = "submit" >
                <
                ArrowRight / >
                <
                /button> <
                /div> { /* </button> */ } { /* </>)} */ }

                <
                /Row>

                {
                    /* <div className="col-md-1">
                                      <Link
                                        to="/edit/:id"
                                        className="btn btn-outline-dark ml-5 my-1 ml-auto w-auto"
                                      >
                                        edit
                                      </Link>
                                    </div> */
                } <
                div className = "col-md-8 pl-5 about-info" >
                <
                div className = "tab-content profile-tab"
                id = "myTabContent" >
                <
                div
                className = "tab-pane fade show active"
                id = "home"
                role = "tabpanel"
                aria - labelledby = "home-tab" >
                <
                div className = "row mt-5" >
                <
                div className = "col-md-6" >
                <
                label > { " " } <
                b > User - Id < /b>{" "} <
                /label> <
                /div> <
                br > < /br> <
                div className = "col-md-6" >
                <
                p > { userData && userData.id } < /p> <
                /div> <
                /div> <
                hr style = {
                    { width: "360px" } } > < /hr> <
                div className = "row" >
                <
                div className = "col-md-6" >
                <
                label > { " " } <
                b > Full Name < /b> <
                /label> <
                /div> <
                br > < /br> <
                div className = "col-md-6" >
                <
                p > { userData && userData.name } < /p> <
                /div> <
                /div> <
                hr style = {
                    { width: "360px" } } > < /hr> <
                div className = "row" >
                <
                div className = "col-md-6" >
                <
                label >
                <
                b > Email < /b> <
                /label> <
                /div> <
                br > < /br> <
                div className = "col-md-4" >
                <
                p > { userData && userData.email } < /p> <
                /div> <
                div className = "col-md-2" >
                <
                button
                style = {
                    { marginLeft: "75px", marginTop: "30px" } }
                className = "btn btn-warning"
                onClick = { handleEmail } >
                Verify <
                /button> <
                /div> <
                /div> <
                hr style = {
                    { width: "360px" } } > < /hr> <
                div className = "row" >
                <
                div className = "col-md-6" >
                <
                label >
                <
                b > Role < /b>{" "} <
                /label> <
                /div> <
                br > < /br> <
                div className = "col-md-6" >
                <
                p > { userData && userData.role } < /p> <
                /div> <
                /div> <
                /div> <
                /div> <
                /div> <
                button onClick = { onCancel }
                className = "btn btn-primary mt-5" >
                Cancel <
                /button> <
                /form> <
                /div> <
                /Col> <
                /Row> <
                /Container> <
                />
            );
        };
        export default Profile;