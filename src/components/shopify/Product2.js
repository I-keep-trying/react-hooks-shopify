import React, {useState} from 'react';
import VariantSelector from './VariantSelector';

// constants
const ONE_SIZE_FITS_MOST = "One Size Fits Most";

const Product = (props) => {
    const [options, setOptions] = useState(props.initState)
/*     let defaultOptionValues = {}
  props.product.options.forEach((selector) => {
    defaultOptionValues[selector.name] = selector.values[0].value;
  });
  state = { selectedOptions: defaultOptionValues }; */

/*   const findImage = (images, variantId) => {
    const primary = images[0];

    const image = images.filter(function (image) {
      return image.variant_ids.includes(variantId);
    })[0];

    return (image || primary).src;
  } */

  const handleOptionChange = (event) => {
    const target = event.target
    let selectedOptions = state.selectedOptions;
    selectedOptions[target.name] = target.value;

    const selectedVariant = props.client.product.helpers.variantForOptions(props.product, selectedOptions)

    setState({
      selectedVariant: selectedVariant,
      selectedVariantImage: selectedVariant.attrs.image
    });
  }

  const handleQuantityChange = (event) => {
    setState({
      selectedVariantQuantity: event.target.value
    });
  }

    let aOptionNames = [];
    let variantImage = state.selectedVariantImage || props.product.images[0]
    let variant = state.selectedVariant || props.product.variants[0]
    let variantQuantity = state.selectedVariantQuantity || 1
    let variantSelectors = props.product.options.map((option) => {
      aOptionNames.push(option.name);
      return (
        <VariantSelector
          handleOptionChange={handleOptionChange}
          key={option.id.toString()}
          option={option}
        />
      );
    });
    let bShowOneSizeFitsMost = (variantSelectors.length === 1 && aOptionNames[0] === "Title");
    return (
      <div className="Product">
        {props.product.images.length ? <img src={variantImage.src} alt={`${props.product.title} product shot`}/> : null}
        <h5 className="Product__title">{props.product.title}</h5>
        <p>${variant.price}</p>
        {bShowOneSizeFitsMost ? <h5 className="Product__title">{ONE_SIZE_FITS_MOST}</h5> : variantSelectors}
        <label className="Product__option">
          Quantity: <input className="form-control" min="1" type="number" defaultValue={variantQuantity} onChange={handleQuantityChange}></input>
        </label>
        <button className="Product__buy button" onClick={() => props.addVariantToCart(variant.id, variantQuantity)}>Add to Cart</button>
      </div>
    );
}

export default Product;
