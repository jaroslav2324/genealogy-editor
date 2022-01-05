import React, { useState } from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import IPerson from "../../types/interfaces/IPerson";
import Characteristics from "../Characteristics/Characteristics";
import "./CharacterRedactor.css";

function CharacterRedactor() {
  const characters = useTypedSelector((state) => state.characters);
  const charId = useTypedSelector((state) => state.app?.editedId);
  const isEditing = useTypedSelector((state) => state.app?.isEditing);
  const dispatch = useTypedDispatch();
  /*открыть/закрыть меню редактирования */
  const [isOpen, setIsOpened] = useState(1);
  const [Text, setText] = useState("Edit");

  const [person, setPerson] = useState<IPerson>();
  if (typeof isEditing === "undefined") {
    dispatch({ type: "SwitchEditCharacter", payload: true });
    return <h2>NOT INITIALIZED</h2>;
  }
  if (!characters) return <h2>NOT INITIALIZED</h2>;
  const character = characters.find(
    (v) => v.id.valueOf() === (charId ? charId.valueOf() : 0)
  );
  if (!character)
    return (
      <div>
        <h2>CHARACTER UNFOUND</h2>
        <button
          onClick={() => {
            dispatch({ type: "GenearateDynasty" });
            dispatch({ type: "UpdateLinks" });
          }}
        >
          GENERATE DYNASTY
        </button>
      </div>
    );
  if (!person) {
    setPerson(character);
    return <h2>PERSON IS NULL</h2>;
  }
  if (person.id.valueOf() !== character.id.valueOf()) setPerson(character);



  const closeClickHandler = () => {
    setIsOpened(0);
  };

  const editHandler = () => {
    if (isEditing) {
      console.log(person);
      dispatch({ type: "UpdateCharacter", payload: person });
      dispatch({ type: "SwitchEditCharacter", payload: false });
      setText("Edit");
    } else {
      dispatch({ type: "SwitchEditCharacter", payload: true });
      setText("Save");
    }
  };

  const linesArrAddHandler = () => {
    setPerson({
      ...person,
      arrayOfLines: [
        ...person.arrayOfLines,
        {
          id: new Date().getDate().toString(),
          name: "Name",
          description: "description",
        },
      ],
    });
  };

  return isOpen ? (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button className="btn" onClick={closeClickHandler}>
          Close
        </button>
        <button onClick={editHandler} className="btn">
          {Text}
        </button>
        <button className="btn" onClick={linesArrAddHandler}>
          New Line
        </button>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "1rem",
          borderBottom: "1px solid #000",
        }}
      >
        <img
          src=""
          style={{ height: "17vw", width: "13vw", marginRight: "1rem" }}
        />
        <Characteristics
          isEditing={isEditing}
          person={person}
          setPerson={setPerson}
        />
      </div>
      <div>
        {person.arrayOfLines.map((line) => {
          const { id, name, description } = line;
          return (
            <LineEdit
              isEditing={isEditing}
              id={id}
              lineName={name}
              description={description}
              person={person}
              setPerson={setPerson}
            />
          );
        })}
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default CharacterRedactor;

/*Запись о пресонаже. Можно редактировать*/
function LineEdit(props: {
  isEditing: boolean;
  id: string;
  lineName: string;
  description: string;
  person: IPerson;
  setPerson: React.Dispatch<React.SetStateAction<IPerson | undefined>>;
}) {
  const [lineName, setLineName] = useState(props.lineName);
  const [description, setDescription] = useState(props.description);
  return props.isEditing ? (
    <div
      key={props.id}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "8rem",
      }}
    >
      <div style={{ display: "grid" }}>
        <input
          defaultValue={lineName}
          onChange={(e) => {
            setLineName(e.target.value);
            props.setPerson({
              ...props.person,
              arrayOfLines: [
                ...props.person.arrayOfLines,
                { id: props.id, name: lineName, description: description },
              ],
            });
          }}
        />
        <input
          defaultValue={props.description}
          onChange={(e) => {
            setDescription(e.target.value);
            props.setPerson({
              ...props.person,
              arrayOfLines: [
                ...props.person.arrayOfLines,
                { id: props.id, name: lineName, description: description },
              ],
            });
          }}
        />
      </div>
      <button
        style={{ width: "2rem", height: "2rem" }}
        onClick={() => {
          let newArr = props.person.arrayOfLines.filter((line) => {
            if (line.id !== props.id) {
              return line;
            }
          });
          props.setPerson({ ...props.person, arrayOfLines: newArr });
        }}
      />
    </div>
  ) : (
    <div key={props.id} style={{ height: "8rem" }}>
      <h4>{lineName}</h4>
      <p>{description}</p>
    </div>
  );
}
