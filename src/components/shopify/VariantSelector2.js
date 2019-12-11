import React from 'react'

const VariantSelector = props => {
 // console.log(props.option)
  return (
    <select
      className="Product__option"
      name={props.option.name}
      key={props.option.id}
      onChange={props.handleOptionChange}
    >
      {props.option.values.map(value => {
        return (
          <option
            value={value}
            key={`${props.option.id}-${value}`}
          >{`${value}`}</option>
        )
      })}
    </select>
  )
}

export default VariantSelector
