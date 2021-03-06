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
