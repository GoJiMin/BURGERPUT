package burgerput.project.zenput.web.altPages;

import burgerput.project.zenput.Services.saveData.SaveData;
import burgerput.project.zenput.intercepter.checkSession.CreateSession;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.time.LocalTime;

import static burgerput.project.zenput.Const.BURGERPUTSITE;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/loading")
public class LoadingController {
    private final SaveData saveData;


    @GetMapping
    public void loading(HttpServletRequest request, HttpServletResponse response) throws IOException {

        //Start Loading Logic
        saveData.macihneZenputDataSave();
        saveData.foodZenputDataSave();

        log.info("request URL ={}", request.getRequestURL());
        log.info("loading Controller={}", LocalTime.now().toString() );

        response.sendRedirect(BURGERPUTSITE);

    }
}
