import React from "react";
import './App.css'
import axios from "axios";
import {useState} from "react";
import error from "eslint-plugin-react/lib/util/error.js";


function App() {
    const [allPosts, setAllPosts] = useState([]);
    const [post6, setPost6] = useState(null);

    async function fetchAllPosts() {

        try {
            const response = await axios.get('http://localhost:3000/posts');
            setAllPosts(response.data);
            console.log('Alle posts opgehaald', response.data);
        } catch (e) {
            console.error('Fout bij het ophalen van posts', error);
        }
    }

    async function fetchPostById6() {

        try {
            const response = await axios.get('http://localhost:3000/posts/6');
            setPost6(response.data.id);
            console.log('Post 6 opgehaald', response.data);
        } catch (e) {
            console.error('Fout bij het ophalen van de post', error);
        }
    }

    async function addNewPost() {
        try {
            const response = await axios.post('http://localhost:3000/posts',
                {
                    title: "Wat gebruiker heeft ingevuld",
                    subtitle: "Wat gebruiker heeft ingevuld",
                    content: "Wat gebruiker heeft ingevuld, in dit geval minder dan 100 woorden",
                    author: "Voornaam achternaam",
                    created: "2023-09-21T09:30:00Z",
                    readTime: 1,
                    comments: 0,
                    shares: 0,
                }
            );
            console.log('Nieuwe post toegevoegd: ', response.data)

        } catch (e) {
            console.error('Fout bij het toevoegen van een nieuwe post', error);
        }
    }

    async function deleteLastPost(){
        const lastPostId= 23;

        try {
            await axios.delete(`http://localhost:3000/posts/${lastPostId}`)
            console.log(`Post met Id ${lastPostId} is succesvol verwijderd`);

        }catch (error){
            console.error (`Fout bij het verwijderen van post met Id ${lastPostId}`, error)
        }
    }
    async function updateFirstPosts() {

        const firstPostId = 1;

        try {
            const updateData = {
                ...firstPostId,
                id: 1,
                title: "De Smaken van Italië",
                subtitel: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                content: "Italië, het land van heerlijke pasta, pizza en gelato, is een culinair paradijs dat elke fijnproever moet ervaren. In deze blog nemen we je mee op een smakelijke reis door Bella Italia. Ontdek de geheimen achter de perfecte risotto, leer hoe je zelfgemaakte pasta maakt en proef de verrukkelijke regionale gerechten van Noord tot Zuid. Bereid je voor om je smaakpapillen te verwennen in de keuken van de laarsvormige natie.",
                created: "2023-09-21T09:30:00Z",
                author: "Anna de Kok",
                readTime: 5,
                comments: 12,
                shares: 8,
            };
            await axios.put(`http://localhost:3000/posts/${firstPostId}`, updateData);
            console.log(`Subtitel van post ${firstPostId} is succesvol gewijzigd`);

        } catch (error) {
            console.error(`Fout bij het wijzigen van de subtitel van post ${firstPostId}`, error);
        }
    }

    return (
        <>
            <button type='button' onClick={fetchAllPosts}>Alle posts</button>
            {allPosts.length > 0 && (
                <div>
                    <h2> Opgehaalde Posts:</h2>
                    <ul>
                        {allPosts.map((post) => (
                                <li key={post.id}> {post.title}</li>
                            )
                        )}
                    </ul>
                </div>
            )}
            <button type='button' onClick={fetchPostById6}>Post ID:6 ophalen</button>
            {post6 && (
                <div>
                    <h2> Opgehaalde post 6: </h2>
                    <p>Id: {post6.id} </p>
                    <p>Title: {post6.title}</p>
                    <p>Subtitle: {post6.subtitle}</p>
                    <p>Content: {post6.content}</p>
                    <p>Created: {post6.created}</p>
                    <p>Author: {post6.author}</p>
                    <p>Readtime: {post6.readtime}</p>
                    <p>Comments: {post6.comments} </p>
                    <p>Shares: {post6.shares}</p>
                </div>
            )}

            <button type='button' onClick={addNewPost}>Nieuwe post toevoegen</button>

            <button type='button' onClick={deleteLastPost}>Laatste post verwijderen</button>

            <button type= 'button' onClick={updateFirstPosts}>Subtitel eerste blogpost wijzigen</button>

        </>
    )
    }

export default App;
