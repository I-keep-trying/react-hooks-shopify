import React, { useState, useEffect } from 'react'
import VariantSelector from './VariantSelector2'

// constants
const ONE_SIZE_FITS_MOST = 'One Size Fits Most'

const Product = props => {

const [state, setState] = useState(props)

useEffect(() => {
  setState(props)
}, [props])

let defaultOptionValues = {}
props.product.options.forEach(selector => {
    defaultOptionValues[selector.name] = selector.values[0].value
  })

  const handleOptionChange = (event) => {
    const target = event.target
     defaultOptionValues[target.name] = target.value

    const selectedVariant = props.client.product.helpers.variantForOptions(
      props.product,
      defaultOptionValues
    )

    setState({
      selectedVariant: selectedVariant,
      selectedVariantImage: selectedVariant.attrs.image,
    })
  }

  const handleQuantityChange = (event) => {
    setState({
      selectedVariantQuantity: event.target.value,
    })
  }

    let aOptionNames = []

    let variantQuantity = state.selectedVariantQuantity || 1

    let variantImage =
      state.selectedVariantImage || props.product.images[0]
    let variant = state.selectedVariant || props.product.variants[0]
    console.log(props.product.options[0])
    let variantSelectors = props.product.options.map(option => {
      aOptionNames.push(option.name)
      return (
        <>
        <VariantSelector
          handleOptionChange={handleOptionChange}
          key={option.id.toString()}
          option={option}
        />
        <div>

        </div>
        </>
      )
    })

    return (
      <div className="Product">
        {aOptionNames[0]}
        {props.product.images.length ? (
          <img
            src={variantImage.src}
            alt={`${props.product.title} product shot`}
          />
        ) : null}
        <h5 className="Product__title">Title: {props.product.title} </h5>
        <p>${variant.price}</p>
       {variantSelectors}
        <label className="Product__option">
          Quantity:{' '}
          <input
            className="form-control"
            min="1"
            type="number"
            defaultValue={variantQuantity}
            onChange={handleQuantityChange}
          ></input>
        </label>
        <button
          className="Product__buy button"
          onClick={() =>
            props.addVariantToCart(variant.id, variantQuantity)
          }
        >
          Add to Cart
        </button>
      </div>
    )
}

export default Product
