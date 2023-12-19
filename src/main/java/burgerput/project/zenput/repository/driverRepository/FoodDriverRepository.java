package burgerput.project.zenput.repository.driverRepository;

import org.openqa.selenium.WebDriver;

public class FoodDriverRepository {
    WebDriver driver;

    public void setDriver(WebDriver driver) {
        this.driver = driver;
    }

    public WebDriver getDriver() {
        return driver;
    }
}
