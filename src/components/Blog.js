import './BlogPost'
function Blog() {


  const style = {
    display: "flex",
    padding: '5%',
    height: '100vh'

  }

  const menu = (
    <div className="menu">

      <ul>
      <li>
          <a href="/"> home </a>
        </li>
        <li>
          <a href="/blog"> blog </a>
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
        <div style={style}>
            <h1> 
                blog
            </h1>

            <div className='blog'>
                <h2>
                    Trying to stay committed!
                </h2>

                <p>
                    Any independent research I plan on posting its progress here!
                </p>

            </div>



        {menu}
        
        </div>
    )
}

export default Blog




