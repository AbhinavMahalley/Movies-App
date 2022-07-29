import React, { Component } from 'react'
// import { movies } from './getMovies'
import axios from 'axios';

export default class Movies extends Component {
    constructor(){
        super();
        this.state={
            hover:"",
            parr:[1],
            currPage:1,
            movies:[],
            favourites:[]
        }
    }

   async componentDidMount(){
      const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
        let data = res.data
        this.setState({
          movies:[...data.results]
        })
    }

     changeMovies=async()=>{
      
      const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
      let data = res.data
      this.setState({
        movies:[...data.results]
      })
    }

    handleRight=()=>{
      let temparr=[]
      for(let i=1; i <= this.state.parr.length+1; i++){
        temparr.push(i);
      }
      this.setState({
        parr:[...temparr],
        currPage:this.state.currPage+1
      },this.changeMovies)
      
    }
    handleLeft=()=>{
      if(this.state.currPage!==1){
        this.setState({
          currPage:this.state.currPage-1
        },this.changeMovies)
      }
      
    }

    handleClick=(value)=>{
      if(value !== this.state.currPage){
        this.setState({
          currPage:value
        },this.changeMovies)
      }
    }

    handleFavourites=(movie)=>{
    let oldData = JSON.parse(localStorage.getItem('movies-app')||"[]")
    if(this.state.favourites.includes(movie.id)){
      oldData = oldData.filter((m)=>m.id!==movie.id)
    }else{
      oldData.push(movie);
    }
    localStorage.setItem("movies-app",JSON.stringify(oldData));
    console.log(oldData);
    this.handleFavouritesState();
  }

  handleFavouritesState=()=>{
    let oldData = JSON.parse(localStorage.getItem('movies-app')||"[]")
    let temp = oldData.map((movie)=>movie.id);
    this.setState({
      favourites:[...temp]
    })
  }
  render() {
      // let movie = movies.results

    return (
      <>
      {
          this.state.movies.length===0? <div className="spinner-border text-primary d-flex justify-content-center" role="status">
    <span className="visually-hidden">Loading...</span>
    </div> :
    // background:'#eff4f4',
        <div style={{ paddingTop:'0.8rem'}}>
            <h3 className="text-center "><strong>Trending</strong></h3>
            <div className='movies-list'>
                {
                    this.state.movies.map((movieObj)=>(
                        <div className="card movies-card" onMouseEnter={()=>this.setState({hover:movieObj.id})} onMouseLeave={()=>this.setState({hover:""})}>
                        <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movies-img" alt={movieObj.title}/>
                        {/* <div className="card-body"> */}
                          <h5 className="card-title movies-title shadow-sm p-2 mb-5  rounded">{movieObj.original_title}</h5>
                          {/* <p className="card-text movies-text">{movieObj.overview}</p> */}
                          <div className="button-wrappe" style={{display:'flex', width:'100%', justifyContent:'center'}}>
                            {
                                this.state.hover === movieObj.id &&
                          <a  className="btn btn-primary movies-button" onClick={()=>this.handleFavourites(movieObj)}>{this.state.favourites.includes(movieObj.id)?"Remove from Favourites":"Add to Favourites"}</a>
                            }

                          </div>
                        {/* </div> */}
                      </div>
                    ))
                }
            </div>
            <div style={{display:'flex',justifyContent:'center'}}>
            <nav aria-label="Page navigation example">
            <ul className="pagination pagination-lg ">
                <li key="Previous" className="page-item"><a className="page-link" onClick={this.handleLeft}>Previous</a></li>
                {
                    this.state.parr.map((value)=>(
                      this.state.currPage===value?
                        <li key={value.toString()} className="page-item active"><a className="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                        :
                        <li key={value.toString()} className="page-item "><a className="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>

                    ))
                }
                <li key="Next" className="page-item"><a className="page-link" onClick={this.handleRight}>Next</a></li>
            </ul>
            </nav>
            </div>
        </div>

      }
      </>
    )
  }
}
