import React, { PureComponent } from 'react';
import { Switch } from 'react-router-dom';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



export default class Example extends PureComponent {
    getInventoryValueByCollection(products){
        let hatsInventory=0
        let sneakersInventory=0
        let jacketsInventory=0
        let mensInventory=0
        let womensInventory=0
        products.map(product=>{
            const {collection, inventory, cogs, inventoryByOptions} = product
            if(collection==='Hats')hatsInventory+=this.getProductInventoryValue(product)
            if(collection==='Jackets')jacketsInventory+=this.getProductInventoryValue(product)
            if(collection==='Womens')womensInventory+=this.getProductInventoryValue(product)
            if(collection==='Mens')mensInventory+=this.getProductInventoryValue(product)
            if(collection==='Sneakers')sneakersInventory+=this.getProductInventoryValue(product)


        })
        const inventoryData = [
            {
                Collection:'Hats',
                inventoryValue: hatsInventory
            },
            {
                Collection:'Mens',
                inventoryValue: mensInventory
            },
            {
                Collection:'Womens',
                inventoryValue: womensInventory
            },
            {
                Collection:'Jackets',
                inventoryValue: hatsInventory
            },
            {
                Collection:'Sneakers',
                inventoryValue: sneakersInventory
            }
        ]
        let totalInventory = 0
        inventoryData.map(collection=>totalInventory+=collection.inventoryValue)
        this.props.setTotalInventoryValue(totalInventory)
        return inventoryData
    }

    getProductInventoryValue(product){
        const {cogs} = product
        if(product.inventoryByOptions){
            let productValue=0
            product.inventoryByOptions.map(optionCombo=>{
                productValue+=optionCombo.inventory * cogs
            })
            return productValue
        }else{
            return cogs*product.inventory

        }
    }
  render() {
    const {products} = this.props
    const data = this.getInventoryValueByCollection(products)
    return (
     
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Collection" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="inventoryValue" fill="#8884d8" />
         
        </BarChart>
  
    );
  }
}
