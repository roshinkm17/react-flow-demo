import TextNodePreview from "./Previews/TextNodePreview"

export default function Sidebar() {

    return (
        <div className="sidebar">

            <div className="custom-nodes-wrapper">

                {/* All custom node preview components should be added inside this */}
                <TextNodePreview />

            </div>

            <div className="sidebar-footer">

                <button>Save changes</button>

            </div>

        </div>
    )
}