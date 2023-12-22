package burgerput.project.zenput.web.manager.machine;

import burgerput.project.zenput.repository.driverRepository.MachineDriverRepository;
import io.github.bonigarcia.wdm.WebDriverManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;



@Controller
@RequiredArgsConstructor
@Slf4j
public class SubmitMachineController {

    private final MachineDriverRepository machineDriverRepository;

    @GetMapping("back/msubmit")
    public void submitMachine() {
        WebDriver driver = machineDriverRepository.getDriver();

//        WebElement mgrName = driver.findElement(By.xpath("//*[@id=\"field_1\"]/div[2]/textarea"));
//        mgrName.sendKeys("성공했다");

        WebElement button = driver.findElement(By.xpath("//*[@id=\"submit_form\"]"));
        button.click();

        //close the webPage

        driver.quit();
    }
}
