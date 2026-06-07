import {View, StyleSheet, Text} from "react-native";
import {useEffect, useState} from "react";
import wiki from 'wikipedia';
import {wikiSummary, summaryError} from 'wikipedia';

import TopicImage from "@/components/TopicImage";
import IconButton from "@/components/IconButton";
import RatingBar from "@/components/RatingBar";
import { RankedTopic } from "@/components/RankedTopic";

const DefaultTopicImage = require('@/assets/images/react-logo.png');
let topicsViewed : RankedTopic[] = [];
let tempSummary : wikiSummary;
let topicLoading : boolean = false;


export default function TopicSelection() {
    const [rankingType, setRankingType] = useState<number>(0);
    const [topicImage, setTopicImage] = useState<string | undefined>(undefined);
    const [currentTopic, setCurrentTopic] = useState<string | undefined>(undefined);
    const [topicPointer, setTopicPointer] = useState<number>(0);
    const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true);

    useEffect(() => {
        console.log(topicsViewed);
        console.log('Topics Viewed: ' + topicsViewed.length);
        console.log('Topic Pointer: ' + topicPointer);
        setTopicLoading(false);
    }, [topicImage])

    const setTopicLoading = (loading : boolean) => {
        topicLoading = loading;
    }

    const onBeginPressed = () => {
        setShowSplashScreen(false)
        fetchNextWiki();
    }

    const onRankChosen = (newRank : number) => {
        if (!topicLoading){
            topicsViewed[topicPointer - 1].setRank(newRank);
            if (isPointerAtEnd()){
                fetchNextWiki();
            }
            else{
                incrementTopicPointer(topicPointer + 1);
                fetchNextWiki(topicPointer + 1);
            }
        }
    }

    const onBackButtonPressed = () => {
        if (!topicLoading){
            incrementTopicPointer(topicPointer - 1);
            fetchNextWiki(topicPointer - 1);
        }
        
    }

    const onNextButtonPressed = () => {
        if (!topicLoading){
            incrementTopicPointer(topicPointer + 1);
            if (isPointerAtEnd()){
                fetchNextWiki();
            }
            else{
                fetchNextWiki(topicPointer + 1);
            }
        }
    }

    const isPointerAtEnd = () => {
        return topicPointer === topicsViewed.length;
    }

    function incrementTopicPointer(newPointer : number){
        if (newPointer > topicsViewed.length){
            setTopicPointer(topicsViewed.length);  
        }
        else if(newPointer < 1){
            setTopicPointer(1);
        }
        else {
            setTopicPointer(newPointer);
        }
    }

    function duplicateTopicExists(potentialTopic : string){
        for (var usedTopic of topicsViewed){
            if (usedTopic.title === potentialTopic){
                return true;
            }
        }
        return false;
    }

    function displayNewTopic(newTopic : wikiSummary){
        setTopicImage(newTopic.originalimage.source);
        setCurrentTopic(newTopic.title);
        if (!duplicateTopicExists(newTopic.title)){
            addToViewedTopics(newTopic.title);
        }
    }

    function addToViewedTopics(newTopicTitle : string, topicRank : number = 0){
        topicsViewed.push(new RankedTopic(newTopicTitle, topicRank));
        incrementTopicPointer(topicsViewed.length);
    }


    async function fetchNextWiki(topicID? : number){
        setTopicLoading(true);
        if (topicID){
            try{
                    tempSummary = await wiki.summary(topicsViewed[topicID - 1].title) as wikiSummary;
                    displayNewTopic(tempSummary);
            } catch (e) {
                    console.log(e);
                }
        } else{
            try{
                    tempSummary = await wiki.random('summary') as wikiSummary;
                    if (!duplicateTopicExists(tempSummary.title)){
                        displayNewTopic(tempSummary);
                    }
                    else{
                        fetchNextWiki();
                    }
            } catch (e) {
                    console.log(e);
                }
        }
    }

    


    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <View style={[styles.plainImageBorder, showSplashScreen ? styles.plainImageBorder : styles.imageBorder1]}> 
                   <View style={[styles.plainImageBorder, showSplashScreen ? styles.plainImageBorder : styles.imageBorder2]}> 
                        <TopicImage imgSource={DefaultTopicImage} topicImage={topicImage} />  
                    </View> 
                </View>
            </View>
            {showSplashScreen ? (
                <IconButton icon='star' label='BEGIN' onPress={onBeginPressed}/>
            ) : (
                <View>
                    <Text style={styles.topicText}>{currentTopic}</Text>
                    <RatingBar onButtonChosen={onRankChosen}/>
                    <View style={styles.navigationButtonContainer}>
                        {(topicPointer <= 1 || topicsViewed.length <= 1) ? (
                            <View></View>
                        ) : (
                            <IconButton icon='arrow-back' label='Previous Topic' onPress={onBackButtonPressed}/>
                        )}
                        <IconButton icon='arrow-forward' label='Next Topic' onPress={onNextButtonPressed}/>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#243857',
        flexDirection: 'column',
        gap: 10,
    },
    imageContainer: {
        flex: 3,
        width: '80%',
        height: '80%',
        alignItems: 'center',
        alignSelf: 'center'
    },
    topicText: {
        flex: 2,
        color: 'white',
        alignSelf: 'center',
        marginBottom: 10
    },
    navigationButtons: {
        backgroundColor: '#5b7cb0'
    },
    navigationButtonContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        gap: 100,
        marginBottom: 100
    },
    imageBorder1: {
        backgroundColor: '#fa8455',
        borderRadius: 18,
        padding: 10,
        width: '30%',
        height: '100%',
        alignItems: 'center',
        alignSelf: 'center'
    },
    imageBorder2: {
        backgroundColor: '#7ee6d6',
        borderRadius: 18,
        padding: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        alignSelf: 'center'
    },
    plainImageBorder: {
        alignItems: 'center',
        alignSelf: 'center',
        width: '80%',
        height: '80%',
    }
});