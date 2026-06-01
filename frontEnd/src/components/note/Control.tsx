import color from "../../assets/data/colors.json";
import Color from "./Colors";
import AddButton from "./AddButton";

const Control = () => {
    return (
        <div id="controls">
            <AddButton />
            {color.map((color) => (
                <Color key={color.id} color={color} />
            ))}
        </div>
    );
};

export default Control;