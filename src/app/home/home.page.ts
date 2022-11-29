import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component } from '@angular/core';
import { firstValueFrom, lastValueFrom } from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private httpClient: HttpClient
  ) {}

  async requestBlob() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    const result = await lastValueFrom(
      // Our production app uses an API that requests a Blob via a POST,
      // but this issue appears reproducible using a GET.
      this.httpClient.get('https://picsum.photos/id/237/200/300', {
        headers,
        responseType: 'blob',
      })
    );

    console.log(result);
  }
}
