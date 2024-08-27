function Form({username,password,setUsername,setPassword,label,onSubmit}){
    return(
        <div className="auth-container">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="username">username</label>
                    <input type="text" name="username" value={username} onChange={(event) => { setUsername(event.target.value) }} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" value={password} onChange={(event) => { setPassword(event.target.value) }} />
                </div>
            </form>
            <button type="submit" onClick={onSubmit}>{label}</button>
        </div>
    )
}

export default Form;