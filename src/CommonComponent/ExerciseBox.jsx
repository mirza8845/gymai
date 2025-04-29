import React from 'react'
import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import { Table, Row, Rows, Col, TableWrapper } from 'react-native-table-component'

const ExerciseBox = ({
  title,
  tableHead,
  tableTitle,
  tableData,
  image,
  onRemove,
  onAddSet,
  onPress
}) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Pressable onPress={onRemove}>
          <Text style={styles.removeText}>Remove</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.tableContainer}>
          <Table>
            <Row
              data={tableHead}
              flexArr={[1, 2, 1, 1]}
              style={styles.tableHead}
              textStyle={styles.tableText}
            />
            <TableWrapper style={styles.tableWrapper}>
              <Col
                data={tableTitle}
                style={styles.tableTitleCol}
                heightArr={[28, 28]}
                textStyle={styles.tableText}
              />
              <Rows
                data={tableData}
                flexArr={[2, 1, 1]}
                style={styles.tableRow}
              />
            </TableWrapper>
          </Table>

          <Pressable onPress={onAddSet} style={styles.addSetButton}>
            <Text style={styles.addSetText}>+ Add Set</Text>
          </Pressable>
        </View>

        <View style={styles.imageContainer}>
          <Image source={image} style={styles.exerciseImage} />
          <Text style={styles.howToText}>How to perform</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default ExerciseBox

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    width: 370,
    height: 200,
    borderRadius: 20,
    marginVertical: 15,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  removeText: {
    color: '#FF0000',
  },
  content: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  tableContainer: {
    flex: 2,
  },
  tableHead: {
    height: 40,
  },
  tableWrapper: {
    flexDirection: 'row',
  },
  tableTitleCol: {
    flex: 1,
  },
  tableRow: {
    height: 28,
  },
  tableText: {
    fontWeight: 'bold',
  },
  addSetButton: {
    paddingTop: 10,
  },
  addSetText: {
    fontSize: 14,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseImage: {
    width: 110,
    height: 100,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  howToText: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderColor: 'black',
    padding: 3,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },
})
