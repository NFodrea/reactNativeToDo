import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    AsyncStorage
} from 'react-native';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: ['take out trash', 'buy food', 'finish app'],
            completedTasks: [],
            task: ""
        };
    }

    componentWillMount() {
        // this.setStorage(); //Should not need. Run if default ToDos do not load on app initiation
        AsyncStorage.getItem('tasks')
            .then((response) => {
                if (response) {
                    this.setState({tasks: JSON.parse(response)});
                } else {
                    this.state.tasks;
                }
            });
        AsyncStorage.getItem('completedTasks')
            .then((response) => {
                if (response) {
                    this.setState({completedTasks: JSON.parse(response)});
                } else {
                    this.state.completedTasks;
                }
            });
    }

    componentDidUpdate() {
        this.setStorage()
    }


    setStorage() {
        AsyncStorage.setItem('tasks', JSON.stringify(this.state.tasks));
        AsyncStorage.setItem('completedTasks', JSON.stringify(this.state.completedTasks));
    }


    renderList(tasks) {
        return (
            tasks.map((task, index) => {
                return (
                    <View key={task} style={styles.task}>
                        <Text>
                            {task}
                        </Text>
                        <TouchableOpacity
                            onPress={() => this.completeTask(index)}
                        >
                            <Text>
                                &#10003;
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            })
        );
    }

    renderCompleted(tasks) {
        return (
            tasks.map((task, index) => {
                return (
                    <View key={task} style={styles.task}>
                        <Text style={styles.completed }>
                            {task}
                        </Text>
                        <TouchableOpacity
                            onPress={ () => this.deleteTask(index)}
                        >
                            <Text>
                                &#10005;
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            })

        )
    }

    deleteTask(index) {
        let completedTasks = this.state.completedTasks;
        completedTasks = completedTasks.slice(0, index).concat(completedTasks.slice(index + 1));
        this.setState({completedTasks})
        this.setStorage();
    }

    completeTask(index) {
        let tasks = this.state.tasks;
        tasks = tasks.slice(0, index).concat(tasks.slice(index + 1,));

        let completedTasks = this.state.completedTasks;
        completedTasks = completedTasks.concat([this.state.tasks[index]])

        this.setState({
            tasks,
            completedTasks
        })
        this.setStorage();
    }

    addTask() {
        let tasks = this.state.tasks.concat([this.state.task]);
        this.setState({tasks});
        this.setStorage();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Awesome Todo app
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Add a task..."
                    onChangeText={ (text) => {
                        this.setState({task: text})
                        console.log(this.state.task)
                    }}
                    onEndEditing={() => this.addTask()}
                />
                <ScrollView>
                    {this.renderList(this.state.tasks)}
                    {this.renderCompleted(this.state.completedTasks)}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        margin: 30,
        marginTop: 40,
        textAlign: 'center',
        fontSize: 18

    },
    task: {
        flexDirection: 'row',
        height: 60,
        borderBottomWidth: 1,
        borderColor: 'black',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20
    },
    input: {
        height: 60,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        textAlign: 'center',
        margin: 10
    },
    completed: {
        color: '#555',
        textDecorationLine: 'line-through'
    }
})

// Future feature list
// Create a “clear all” button that deletes all completed tasks at once.
// Implement a completed task counter that keeps track of every finished item.
// Enable an editing feature that uses the index of each task to edit and save text. will need to convert each <Text /> component for each task into <TextInput /> components.