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
    public void submitFood() {
        WebDriver driver = foodDriverRepository.getDriver();

        WebElement button = driver.findElement(By.xpath("//*[@id=\"submit_form\"]"));
        button.click();

        log.info("button Clicked!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

//        File screenshotAs = ((TakesScreenshot) driver).getScreenshotAs((OutputType.FILE));
        driver.quit();

//        File file = new File("C:/Users/bbubb/Desktop/test/food.png");
//
//        try {
//            FileUtils.copyFile(screenshotAs, file);
////            BufferedWriter writer = new BufferedWriter(new FileWriter(file));
////            writer.write(source);
////            writer.close();
//        } catch (IOException e) {
////            e.printStackTrace();
//        }

    }
}
