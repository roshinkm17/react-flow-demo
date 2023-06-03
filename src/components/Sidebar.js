import TextNodePreview from "./Previews/TextNodePreview"
import { Button } from "@material-ui/core"

export default function Sidebar() {

    return (
        <div className="sidebar">

            <div className="custom-nodes-wrapper">

                {/* All custom node preview components should be added inside this */}
                <TextNodePreview />

            </div>

            <div className="sidebar-footer">

                <Button variant="contained" color="primary" className="save-btn" disableElevation fullWidth >Save Changes</Button>

            </div>

        </div>
    )
}