
import { Marked } from "marked"
function Blog() {
    


    return (
        <div>
            <h1> 
                Blog
            </h1>

            {
                Marked.parse('# Hello World')
            }
        </div>
    )
}

export default Blog




