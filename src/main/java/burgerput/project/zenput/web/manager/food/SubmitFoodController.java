package burgerput.project.zenput.web.manager.food;

import burgerput.project.zenput.repository.driverRepository.FoodDriverRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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

        driver.quit();

    }
}
