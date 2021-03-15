import './test.scss'

export default function PostIt(){


    return (
        <div>
            <div draggable ondragstart={(e) => ondragstart(e)}> 
                <h1> Bonjour tout le monde </h1>
                <p> Coucou les amis</p>
            </div>
            <div className="dropZone" ondragover="onDragOver(event);"
    ondrop="onDrop(event);">

            </div>

        </div>
    )
}

const ondragstart = (e) => {
    e.preventDefault();
    e
    .dataTransfer
    .setData('text/plain', e.target.id);
    e.currentTarget
    .style
    .backgroundColor = 'yellow';

}