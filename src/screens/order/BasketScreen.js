import React, {useState} from "react";
import { View , Text, StyleSheet, SafeAreaView, Button, 
  Image, FlatList, TouchableOpacity } from "react-native";

const BasketScreen = (props) => {

    const {name, location, picture} = props.route.params.location;
    const {orderType, when, basket, update=false} = props.route.params;

    const [data, setData] = useState(JSON.parse(basket));
    if (update) {
      setData(JSON.parse(basket));
      props.route.params.update = false;
    }

    var subtotal = 0;
    for (let i = 0; i < data.length; i++) {
      subtotal += data[i].price * data[i].quantity;
    } 
    const taxRate = 0.08875;
    const estimatedTax = taxRate*subtotal;
    const estimatedTotal = (1+taxRate)*subtotal;

    const [editItems, setEditItems] = useState(false);

    return (<SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image source={{ uri : picture.thumbnail}} style={styles.image} />
                <View style={styles.profileText}> 
                    <Text> Name: {name.first} {name.last} </Text>
                    <Text> City: {location.city} </Text>
                    <Text> State: {location.state} </Text>
                    <Text> Country: {location.country} </Text>
                </View>
            </View>
            <Button
                title="Add More Items"
                onPress={() => props.navigation.navigate("Menu", {
                  basket: JSON.stringify(data),
                  location: props.route.params.location,
                  orderType: orderType,
                  when: when,
                })}
            />
            <View style={styles.row}>
              <Text style={styles.text}>Order Type:</Text>
              <Text style={styles.text}>{orderType}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>When:</Text>
              <Text style={styles.text}>{when}</Text>
            </View>
            <Text style={styles.title}>Coupon</Text>
            <Button
                title="Redeem"
            />
            <View style={styles.row}>
              <Text style={styles.title}>Items</Text>
              {(editItems)? <Button
                title='Done'
                onPress={() => setEditItems(false)}
              /> : <Button 
                title='Edit'
                onPress={() => setEditItems(true)}
              />}
            </View>
            <FlatList
              style={styles.list}
              data={data}
              keyExtractor={( item, index ) => 'key'+index}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => props.navigation.navigate("Item", {
                    name: item.name,
                    price: item.price, 
                    calories: item.calories,
                    initialQuantity: item.quantity,
                    index: index,
                    location: props.route.params.location,
                    orderType: orderType, 
                    when: when,
                    basket: JSON.stringify(data),
                  })}
                >
                  <View style={styles.row}>
                    <Text style={styles.text}>{item.quantity}x {item.name}</Text>
                    <View style={styles.row}>
                      <Text style={styles.text}>${(item.quantity*item.price).toFixed(2)}  </Text>
                      {(editItems)? <TouchableOpacity
                        onPress={() => setData(data.filter((v, i) => i != index))}
                      >
                        <Text style={{color: '#1384FF'}}>delete</Text>
                      </TouchableOpacity> : <Text style={{color: '#1384FF'}}>{'>'}</Text>}
                    </View>
                  </View>
                </TouchableOpacity>
                )}
            />
            <View style={styles.total}>
              <View style={styles.row}>
                <Text style={styles.text}>Subtotal:</Text>
                <Text style={styles.text}>${subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>Estimated Tax:</Text>
                <Text style={styles.text}>${estimatedTax.toFixed(2)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.textBold}>Estimated Total:</Text>
                <Text style={styles.textBold}>${estimatedTotal.toFixed(2)}</Text>
              </View>
            </View>
        </View>
        <Button
            title="Checkout"
        />
    </SafeAreaView>
    );
};

export default BasketScreen;

const styles = StyleSheet.create({
    safeAreaContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  container: {
    //alignItems: 'center',
    //justifyContent: 'center',
    marginHorizontal: 20,
  },
  profile: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  profileText:{
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    marginVertical: 10,
  },
  text: {
    fontSize: 20,
  },
  textBold: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    height: '40%',
  },
  total: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
});