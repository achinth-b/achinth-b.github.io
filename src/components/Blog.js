import './BlogPost'
function Blog() {


  const style = {
    display: "flex",
    padding: '5%',
    height: '100vh',
    position: 'relative',

  }

  const post = {
    position: 'absolute',
    left: '0',
    top: '0'
  }

  const menu = (
    <div className="menu">

      <ul>
      <li>
          <a href="/"> home </a>
        </li>
        <li>
          <a href="/posts"> posts </a>
        </li>
        <li>
          <a href="/papers"> papers </a>
        </li>
        
        <br/>
        
        <li>
          <a href="https://linkedin.com/in/-achinth"> linkedin </a>
        </li>
        <li>
          <a href="https://github.com/achinth-b"> github </a>
        </li>
        <li>
          <a href="https://x.com/bigdaddy2chinz"> twitter </a>
        </li>
        <li>
          <a href="mailto:achinth@student.ubc.ca?subject=Hi Achinth!"> email </a>
        </li>
      </ul>

    </div>
  )


    return (
        <div style={{display: 'flex', height: "100vh"}}>
            <h1 style={{padding: '5%'}}> 
                blog
            </h1>

            
                 
            {menu}
            </div>

                

            

        
        
    )
}

export default Blog




