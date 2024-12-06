import React, {useState} from 'react';
import {
    SafeAreaView,
    Text,
    View,
    Pressable,
    FlatList,
    StyleSheet, Image,
} from 'react-native';
import Ic_rightChevron from '../../assets/svg/ic_rightChevron.tsx';

// Todo 데이터 인터페이스
interface Todo {
    id: string;
    task: string;
    completed: boolean;
}

// 요일 이름 배열
const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function TodoView() {
    // 현재 날짜
    const [currentDate, setCurrentDate] = useState(new Date());

    // Todo 리스트 데이터 (임시 데이터)
    const [todos, setTodos] = useState<Record<string, Todo[]>>({
        [getFormattedDate(new Date())]: [],
    });

    // 날짜 형식화 함수
    function getFormattedDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}. ${month}. ${day}`;
    }

    // 날짜 이동
    const handleDateChange = (direction: 'prev' | 'next') => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
        setCurrentDate(newDate);
    };

    // 현재 날짜의 요일 가져오기
    const getWeekDay = (date: Date): string => {
        return WEEK_DAYS[date.getDay()];
    };

    // 현재 날짜의 Todo 데이터 가져오기
    const currentDateFormatted = getFormattedDate(currentDate);
    const currentTodos = todos[currentDateFormatted] || [];

    // Todo 완료 상태 토글
    const toggleTodoCompleted = (id: string) => {
        setTodos((prevTodos) => ({
            ...prevTodos,
            [currentDateFormatted]: prevTodos[currentDateFormatted].map((todo) =>
                todo.id === id ? {...todo, completed: !todo.completed} : todo
            ),
        }));
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* 헤더 */}
            <View style={{paddingHorizontal: 24}}>
                <View style={{
                    borderColor: '#f0f0f0',
                    borderWidth: 1,
                    backgroundColor: '#fafafa',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: 8,
                    padding: 4,
                    marginTop: 32,
                }}>
                    <Pressable
                        style={styles.navButton}
                        onPress={() => handleDateChange('prev')}>
                        <Ic_rightChevron size={16} color={'#20B767'} style={{transform: [{rotate: '180deg'}]}}/>
                    </Pressable>
                    <View style={styles.dateContainer}>
                        <Text style={styles.dateText}>{currentDateFormatted} ({getWeekDay(currentDate)})</Text>
                    </View>
                    <Pressable
                        style={styles.navButton}
                        onPress={() => handleDateChange('next')}>
                        <Ic_rightChevron size={16} color={'#20B767'}/>
                    </Pressable>
                </View>
            </View>

            {/* Todo 리스트 */}
            <FlatList
                data={currentTodos}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 70,
                    }}>
                        <Image source={require('../../assets/images/img_main_empty.png')}
                               style={{
                                   width: 240,
                                   height: 260,
                               }}/>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: -30}}>
                            <Text style={{fontSize: 16}}>오늘이 마감일인</Text>
                            <Text style={{fontSize: 16, marginLeft: 4, color: '#20B767'}}>태스크</Text>
                            <Text style={{fontSize: 16}}>가 없습니다</Text>
                        </View>
                    </View>
                }
                renderItem={({item}) => (
                    <Pressable
                        style={[
                            styles.todoItem,
                            item.completed && styles.todoItemCompleted,
                        ]}
                        onPress={() => toggleTodoCompleted(item.id)}>
                        <Text
                            style={[
                                styles.todoText,
                                item.completed && styles.todoTextCompleted,
                            ]}>
                            {item.task}
                        </Text>
                    </Pressable>
                )}
            />
        </SafeAreaView>
    );
}

// 스타일
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    header: {
        marginTop: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    dateContainer: {
        alignItems: 'center',
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    navButton: {
        padding: 10,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    listContainer: {
        padding: 16,
    },
    emptyText: {
        textAlign: 'center',
        color: '#999',
        marginTop: 20,
    },
    todoItem: {
        padding: 16,
        marginBottom: 10,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
    },
    todoItemCompleted: {
        backgroundColor: '#d9fdd3',
    },
    todoText: {
        fontSize: 16,
    },
    todoTextCompleted: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
});
