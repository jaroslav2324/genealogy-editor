import React, { useState } from "react";
import TimelineDate from "../../types/TimelineDate";
import "./Characteristics.css";
import IPerson from "../../types/interfaces/IPerson";
import FieldCharacteristic from "../ui/FieldCharacteristic/FieldCharacteristic";

function Characteristics(props: {isEditing: boolean, person: IPerson, setPerson: React.Dispatch<React.SetStateAction<IPerson | undefined>>}) {
 
 
  return (
    <div style={{ display: "grid" }}>
      <FieldCharacteristic
        fieldName={"Name: "}
        isEditing={props.isEditing}
        handleChange={(e) => {
          props.setPerson({ ...props.person, name: e.target.value });
        }}
        showString={props.person.name}
      />
      <FieldCharacteristic
        fieldName={"Surname: "}
        isEditing={props.isEditing}
        handleChange={(e) => {
          props.setPerson({ ...props.person, surname: e.target.value });
        }}
        showString={props.person.surname}
      />
      <FieldCharacteristic
        fieldName={"Patronymic: "}
        isEditing={props.isEditing}
        handleChange={(e) => {
          props.setPerson({ ...props.person, patronymic: e.target.value });
        }}
        showString={props.person.patronymic}
      />
      <FieldCharacteristic
        fieldName={"Birth Date: "}
        isEditing={props.isEditing}
        handleChange={(e) => {
          let obj = new TimelineDate(0, 0, 0, 0, 0, 0);
          Object.assign(obj, props.person.birth);
          TimelineDate.changeDateString(obj, e.target.value);
          props.setPerson({ ...props.person, birth: obj });
        }}
        showString={TimelineDate.returnDateAsString(props.person.birth)}
      />
      <FieldCharacteristic
        fieldName={"Death Date: "}
        isEditing={props.isEditing}
        handleChange={(e) => {
          if (e.target.value.length > 0) {
            let obj = new TimelineDate(0, 0, 0, 0, 0, 0);
            if (typeof props.person.death == "object") {
              Object.assign(obj, props.person.death);
            }
            TimelineDate.changeDateString(obj, e.target.value);
            props.setPerson({ ...props.person, death: obj });
          } else {
            props.setPerson({ ...props.person, death: null });
          }
        }}
        showString={
          props.person.death
            ? TimelineDate.returnDateAsString(props.person.death)
            : "not dead yet"
        }
      />
    </div>
  );
}

export default Characteristics;
