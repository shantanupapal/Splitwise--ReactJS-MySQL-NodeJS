{
    this.state.groupMembers.map((el, i) => (
        <div key={i} className="row addPersonRow">
            <div className="col-sm-10 ">
                <input
                    type="text"
                    className="form-control"
                    value={el.groupMember || ""}
                    onChange={(e) => this.handleChange(i, e)}
                />
            </div>
            <div className="col-sm-2">
                <Link
                    style={{
                        textDecoration: "None",
                    }}
                    onClick={() => this.removeOnClick(i)}
                >
                    <span
                        style={{
                            fontSize: "15px",
                        }}
                    >
                        &#10006;
                    </span>
                </Link>
            </div>
        </div>
    ));
}

return (
    <div className="container-fluid">
        <ProfilePageNav />
        <div className="container profileMain">
            <form action="">
                <div className="row">
                    <div className="col-sm-3" style={{ width: "230px" }}>
                        <img
                            src={profilePhoto}
                            className=""
                            alt="profilepic"
                            style={{ width: "200px", height: "250px" }}
                        />
                        <div>
                            <label htmlFor="browse">Change your avatar</label>
                            <input
                                type="file"
                                id="profilePhoto"
                                name="profilePhoto"
                                accept="image/*"
                            ></input>
                        </div>
                    </div>

                    <div
                        className="col-sm-3"
                        style={{ width: "240px", marginRight: "200px" }}
                    >
                        <div className="form-group">
                            <label htmlFor="name">Your name</label>
                            <input
                                type="text"
                                className="form-control"
                                name=""
                                id="name"
                            />
                            <a href="#" id="show">
                                edit
                            </a>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Your email address</label>
                            <input
                                type="text"
                                name=""
                                className="form-control"
                                id="email"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Your phone number</label>
                            <input
                                type="text"
                                name=""
                                className="form-control"
                                id="phone"
                            />
                        </div>

                        {/*  <div className="form-group">
                            <label htmlFor="password">
                                Your password
                            </label>
                            <input
                                type="password"
                                name=""
                                className="form-control"
                                id="password"
                            />
                        </div>*/}
                    </div>

                    <div className="col-sm-3">
                        <div className="signup-block">
                            <div className="form-group">
                                <label htmlFor="">Your Default currency</label>
                                <br />
                                <label htmlFor="">
                                    <small>(for new expenses)</small>
                                </label>
                                <select
                                    name="currency"
                                    className="form-control"
                                >
                                    <option value="USD ($)">USD ($)</option>
                                    <option value="EUR (€)">EUR (€)</option>
                                    <option value="GBP (£)">GBP (£)</option>
                                    <option value="HUF (Ft)">HUF (Ft)</option>
                                    <option value="INR (₹)">INR (₹)</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">You timezone</label>
                                <select
                                    name="timezone"
                                    className="form-control"
                                >
                                    <option value="Pacific Time (US &amp; Canada)">
                                        (GMT-08:00) Pacific Time (US &amp;
                                        Canada)
                                    </option>
                                    <option value="Central America">
                                        (GMT-06:00) Central America
                                    </option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Language</label>
                                <select
                                    name="language"
                                    className="form-control"
                                >
                                    <option value="English">English</option>
                                    <option value="Hindi">Hindi</option>
                                </select>
                            </div>
                            <button className="btn btn-primary">Save</button>
                        </div>
                    </div>
                    <div className="col-sm-3"></div>
                </div>
            </form>
        </div>
    </div>
);

<!DOCTYPE html>
<html>
  <head>
    <title>Currency Converter in Javascript</title>
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    />
  </head>
  <body>
    <div class="container col-sm-12" id="mainform">
        <div id="signupbox" style=" margin-top:50px" class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">                                     
            <div class="panel panel-info">
                <div class="panel-heading">
                    <div class="panel-title">Register</div>
                </div> 
                <div class="panel-body" >
                    <form class="form-horizontal" role="form" method="post" action="/" enctype="multipart/form-data">
                        <% if (message.length > 0) { %>
                            <div class="alert alert-success col-sm-12"><%= message %></div>
                        <% } %>
                        <div id="signupalert" style="display:none" class="alert alert-danger">
                            <p>Error:</p>
                            <span></span>
                        </div>
                        <div class="form-group">
                            <label for="first_name" class="col-md-3 control-label">First Name</label>
                            <div class="col-md-9">
                                <input type="text" class="form-control" name="first_name" placeholder="First Name">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="last_name" class="col-md-3 control-label">Last Name</label>
                            <div class="col-md-9">
                                <input type="text" class="form-control" name="last_name" placeholder="Last Name">
                            </div>
                        </div>
                                                                                        <div class="form-group">
                            <label for="mob_no" class="col-md-3 control-label">Mobile Number</label>
                            <div class="col-md-9">
                                <input type="number" class="form-control" name="mob_no" placeholder="Mobile Number">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="mob_no" class="col-md-3 control-label">Profile Image</label>
                            <div class="col-sm-9">
                                <input class="form-control" type="file" name="uploaded_image" accept=""/>
                            </div>
                        </div>                                
                        <div class="form-group">
                            <label for="user_name" class="col-md-3 control-label">User Name</label>
                            <div class="col-md-9">
                                <input type="text" class="form-control" name="user_name" placeholder="User Name">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password" class="col-md-3 control-label">Password</label>
                            <div class="col-md-9">
                                <input type="password" class="form-control" name="password" placeholder="Password">
                            </div>
                        </div>
                        <div class="form-group">
                            <!-- Button -->                                       
                            <div class="col-md-offset-3 col-md-9">
                                <button id="btn-signup" type="submit" class="btn btn-info"><i class="icon-hand-right"></i> &nbsp Register</button>
                            </div>
                        </div>  
                    </form>
                 </div>
            </div>
        </div>
    </div>
</body>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</html>

exports.index = function(req, res){
    message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
      var fname= post.first_name;
      var lname= post.last_name;
      var mob= post.mob_no;
 
	  if (!req.files)
				return res.status(400).send('No files were uploaded.');
 
		var file = req.files.uploaded_image;
		var img_name=file.name;
 
	  	 if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                 
              file.mv('public/images/upload_images/'+file.name, function(err) {
                             
	              if (err)
 
	                return res.status(500).send(err);
      					var sql = "INSERT INTO `users_image`(`first_name`,`last_name`,`mob_no`,`user_name`, `password` ,`image`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "','" + img_name + "')";
 
    						var query = db.query(sql, function(err, result) {
    							 res.redirect('profile/'+result.insertId);
    						});
					   });
          } else {
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            res.render('index.ejs',{message: message});
          }
   } else {
      res.render('index');
   }
 
};