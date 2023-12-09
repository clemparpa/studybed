import { Component, OnInit, Injectable } from "@angular/core";
import { MarkdownService } from "ngx-markdown";
import { createInjectionToken } from "ngxtension/create-injection-token";

@Injectable()
export class CustomMarkdownRenderer {
  constructor(private markdownService: MarkdownService) {}

  ngOnInit() {}
}
