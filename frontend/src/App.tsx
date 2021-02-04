import React, {useState} from 'react';
import {
    withAuthenticator,
} from 'aws-amplify-react';
import '@aws-amplify/ui/dist/style.css';
import logo from './logo.svg';
import {AddMovie} from './components/AddMovie';
import {Testimonial} from './components/Testimonial';
import {Button} from './components/Button';
import {Footer} from './components/Footer';
import {Container} from "./components/Container";
import {BasicCard} from "./components/BasicCard";
import {SimpleSectionHeading} from "./components/SimpleSectionHeading";
import type {Movie} from "./models";
import {getProfile, putMovie, getMovies} from "./api";

interface AppProps {
}

function App({}: AppProps) {
    const [movies, setMovies] = useState<Movie[]>([])

    return (
        <Container>
            <Testimonial
                title="Crispy Dragon"
                quote="You may delay, but time will not, and lost time is never found again."
                source="Benjamin Franklin"
            />
            <header className="bg-red-500">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <BasicCard>
                    <Button onClick={() => getMovies(setMovies)}>Set Profile</Button>
                    <button
                        onClick={getProfile}
                        className="p-1 bg-yellow-600 text-capitalize"
                    >
                        Get Profile
                    </button>
                </BasicCard>
            </header>
            <SimpleSectionHeading heading="Add your stuff"/>
            <AddMovie onSubmit={putMovie}/>
            <SimpleSectionHeading heading="Movies"/>
            <HorizontalLinkCard movies={movies}/>
            <Footer/>
        </Container>
    );
}

export default withAuthenticator(App, true);


function HorizontalLinkCard(props: { movies: Movie[] }) {

    const el = props.movies.map(movie => (
        <div
            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
            <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full"
                     src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                     alt=""/>
            </div>
            <div className="flex-1 min-w-0">
                <a href="#" className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true"></span>
                    <p className="text-sm font-medium text-gray-900">
                        {movie.title} ({movie.info.year})
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                        {movie.info.plot}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                        {movie.info.rating}
                    </p>
                </a>
            </div>
        </div>
    ))

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {el}
        </div>
    )
}





