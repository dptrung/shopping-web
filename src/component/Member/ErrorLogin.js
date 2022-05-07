function ErrorLogin(props){
    function errorRender(){
        let {errorsProps} = props

        if(Object.keys(errorsProps).length>0){
            return Object.keys(errorsProps).map((key,index) => {
                return(
                    <li key={index}>{errorsProps[key]}</li>
                )
            })
        }
    }

    return(
        <ul>
            {errorRender()}
        </ul>
    )
}

export default ErrorLogin;