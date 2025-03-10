import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'https://dev.to/api/articles';
  private perPage = 9;

  constructor(private http: HttpClient) {}

  getPosts(page: number = 1): Observable<Post[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', this.perPage.toString());

    return this.http.get<Post[]>(this.apiUrl, { params }).pipe(
      map(posts => posts.map(post => ({
        ...post,
        description: post.description || 'No description available',
        cover_image: post.cover_image || 'https://picsum.photos/seed/${post.id}/800/400',
        tags: post.tags || []
      }))),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred while fetching posts.';
    
    if (error.status === 0) {
      errorMessage = 'Unable to connect to the server. Please check your internet connection.';
    } else if (error.status === 429) {
      errorMessage = 'Too many requests. Please try again later.';
    } else if (error.status === 404) {
      errorMessage = 'The requested posts could not be found.';
    }

    return throwError(() => errorMessage);
  }
}