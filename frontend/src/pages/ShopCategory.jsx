import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../assets/dropdown_icon.png'
import Item from '../components/Item'

const ShopCategory = (props) => {
  const {all_products} = useContext(ShopContext)
  return (
    <div className='banner'>
      <div>
      <img src={props.banner} alt="banner" />
      </div>
      <div className="itemSort m-4">
        <p>
          <span>
            Showing 1-12 items 
          </span>
          Out of 36 prodcuts
        </p>
      </div>
      <div className='m-4'>
        Sort by <img src={dropdown_icon} alt="" />
      </div>
      <div className="items grid-cols-3">
        {all_products.map((item, i)=>{
          if(props.category==item.category){
            return <Item key={i} id= {item.id} name={item.name} image = {item.image} oldPrice = {item.old_price} newPrice = {item.new_price} />
          }
          else{
            return null;
          }
        })}
      </div>
    </div>
    
  )
}

export default ShopCategory
