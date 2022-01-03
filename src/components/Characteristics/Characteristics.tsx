import React, { useState } from "react";
import TimelineDate from "../../types/TimelineDate";
import "./Characteristics.css";
import IPerson from "../../types/interfaces/IPerson";
import FieldCharacteristic from "../ui/FieldCharacteristic/FieldCharacteristic";
import Id from "../../types/Id";

/* нужно переместить*/
export type OnChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => void;

function Characteristics(props: { isEditing: boolean }) {
  /* начальную инициализацию нужно изменить при загрузке персонажа*/
  const [person, setPerson] = useState<IPerson>({
    isMale: true,
    name: "name",
    surname: "surname",
    patronymic: "patronymic",
    birth: new TimelineDate(0, 0, 0, 0, 0, 0),
    death: new TimelineDate(0, 0, 0, 0, 0, 0),
    childCount: 0,
    id: new Id(0),
    _awaitedCildCount: 0,
  });

  let isEditing = props.isEditing;

  return (
    <div style={{ display: "grid" }}>
      <FieldCharacteristic
        fieldName={"Name: "}
        isEditing={isEditing}
        handleChange={(e) => {
          setPerson({ ...person, name: e.target.value });
        }}
        showString={person.name}
      />
      <FieldCharacteristic
        fieldName={"Surname: "}
        isEditing={isEditing}
        handleChange={(e) => {
          setPerson({ ...person, surname: e.target.value });
        }}
        showString={person.surname}
      />
      <FieldCharacteristic
        fieldName={"Patronymic: "}
        isEditing={isEditing}
        handleChange={(e) => {
          setPerson({ ...person, patronymic: e.target.value });
        }}
        showString={person.patronymic}
      />
      <FieldCharacteristic
        fieldName={"Birth Date: "}
        isEditing={isEditing}
        handleChange={(e) => {
          let obj = new TimelineDate(0, 0, 0, 0, 0, 0);
          Object.assign(obj, person.birth);
          TimelineDate.changeDateString(obj, e.target.value);
          setPerson({ ...person, birth: obj });
        }}
        showString={TimelineDate.returnDateAsString(person.birth)}
      />
      <FieldCharacteristic
        fieldName={"Death Date: "}
        isEditing={isEditing}
        handleChange={(e) => {
          if (e.target.value.length > 0) {
            let obj = new TimelineDate(0, 0, 0, 0, 0, 0);
            if (typeof person.death == "object") {
              Object.assign(obj, person.death);
            }
            TimelineDate.changeDateString(obj, e.target.value);
            setPerson({ ...person, death: obj });
          } else {
            setPerson({ ...person, death: null });
          }
        }}
        showString={
          person.death
            ? TimelineDate.returnDateAsString(person.death)
            : "not dead yet"
        }
      />
    </div>
  );
}

export default Characteristics;
