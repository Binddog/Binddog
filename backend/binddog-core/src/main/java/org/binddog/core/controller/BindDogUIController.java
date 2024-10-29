package org.binddog.core.controller;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BindDogUIController {
    @GetMapping(value = "/bind-dog-ui", produces = MediaType.TEXT_HTML_VALUE)
    public String serveIndexHtml() {
        //TODO: yml에 작성한 값으로 동적 매핑 해야함 근데 동적 매핑을 할 때 중복되지 않도록 설계해야할듯
        //TODO: 개발자가 작성한 타 컨트롤러 매핑 URL과 겹치지 않게 하려면 어떻게 하지?
        return "forward:/BINDDOG-UI/index.html";
    }
}

