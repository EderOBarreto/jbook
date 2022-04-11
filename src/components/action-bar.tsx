import "./action-bar.css";
import { useActions } from "../hooks/use-actions";
interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();

  const buttons = [
    { iconName: "fa-arrow-up", onClick: () => moveCell(id, "up") },
    { iconName: "fa-arrow-down", onClick: () => moveCell(id, "down") },
    { iconName: "fa-times", onClick: () => deleteCell(id) },
  ];

  const renderButtons = buttons.map(({ iconName, onClick }) => {
    return (
      <button className="button is-primary is-small" onClick={onClick}>
        <span className="icon">
          <i className={`fas ${iconName}`}></i>
        </span>
      </button>
    );
  });

  return <div className="action-bar">{renderButtons}</div>;
};

export default ActionBar;
