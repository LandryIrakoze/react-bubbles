import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: '',
  code: { hex: '' }
};

const ColorList = ({ colors, updateColors, getData }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const alignFix = {
    textAlign: 'left'
  }

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const clearEdit = () => {
    setEditing(false);
    setColorToEdit(initialColor);
  }

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res);
        updateColors(colors)
        getData();
      })
      .catch(err => console.error(err))
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
        console.log(res)
        clearEdit();
        updateColors(colors)
        getData()
      })
      .catch(err => console.error(err))
  };

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth()
      .post(`http://localhost:5000/api/colors/`, colorToAdd)
      .then(res => {
        console.log(res)
        updateColors(colors)
        getData()
      })
      .catch(err => console.error(err))
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {/* {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div className="color-box" style={{ backgroundColor: color.code.hex }} />
          </li>
        ))} */}
        {colors.map(color => (
          <li key={color.color}>

              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>
              <span onClick={() => editColor(color)} style={alignFix}>
              {" "}
              {color.color}
              </span>
            <div className="color-box" style={{ backgroundColor: color.code.hex }} />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input onChange={e => setColorToEdit({ ...colorToEdit, color: e.target.value })} value={colorToEdit.color} />
          </label>
          <label>
            hex code:
            <input onChange={e => setColorToEdit({...colorToEdit, code: { hex: e.target.value }})} value={colorToEdit.code.hex} />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* <div className="spacer" /> */}
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addColor}>
        <legend>add color</legend>
        <label>
          color name:
          <input onChange={e => setColorToAdd({...colorToAdd, color: e.target.value})} value={colorToAdd.color} />
        </label>
        <label>
          hex code:
          <input onChange={e => setColorToAdd({...colorToAdd, code: {hex: e.target.value}})} value={colorToAdd.code.hex} />
        </label>
        <div className="button-row">
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default ColorList;
