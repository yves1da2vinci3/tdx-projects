import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { Icon } from '@rneui/base';
import Colors from '../Constants/Colors';
import filterCartByLocation from '../utils/FilterPerLocation';

const OtherDropDown = ({ data,Cart,copyCart,setCopyCart}) => {
  console.log(data)
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const firstElement = [{label : "All",value : "All"},{label : "Wenchy",value : "Wenchy"}]
    const ModelizeData =  data.map(datum => ({ label : datum, value : datum }))
 console.log(ModelizeData.concat(firstElement))
   const finalArr = firstElement.concat(ModelizeData)
    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            Dropdown label
          </Text>
        );
      }
      return null;
    };
    const FilterFunc = (item) => { 
      setValue(item)
      if(item.label === "All"){
     setCopyCart(Cart)
      }else{
        console.log("Old Cart: ",Cart[0].items)
        const newCart =  filterCartByLocation(Cart,item.label)
        console.log("item :",item)
        console.log("New Cart: ",newCart)
        setCopyCart(newCart)
      }
     }
  return (
    <View>
       <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: `${Colors.greenColor}` }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={finalArr}
          search
          
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select location' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={FilterFunc }
          renderLeftIcon={() => (
            <Icon
            type='ionicon'
              
              style={styles.icon}
              color={isFocus ? `${Colors.greenColor}` : 'black'}
              name="caret-down"
              size={20}
            />
          )}
        />
    </View>
  )
  
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 50,
      width :160,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });

export default OtherDropDown