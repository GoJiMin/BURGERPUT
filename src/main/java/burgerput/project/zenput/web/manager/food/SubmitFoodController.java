package burgerput.project.zenput.web.manager.food;

import burgerput.project.zenput.repository.driverRepository.FoodDriverRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.hibernate.result.Output;
import org.openqa.selenium.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@RestController
public class SubmitFoodController {

    private final FoodDriverRepository foodDriverRepository;

    @GetMapping("back/fsubmit")
    public void submitFood() throws IOException {
        WebDriver driver = foodDriverRepository.getDriver();

//        WebElement button = driver.findElement(By.xpath("//*[@id=\"submit_form\"]"));
//        button.click();

        log.info("V2 version button 주석처리했듬 사진만 찍어서 서버에 저장");

        File screenshotAs = ((TakesScreenshot) driver).getScreenshotAs((OutputType.FILE));
        File file = new File("/home/ubuntu/burgerput/img/zenputFood.png");
        FileUtils.copyFile(screenshotAs, file);

        log.info("quite the driver");

        driver.quit();



    }
}
