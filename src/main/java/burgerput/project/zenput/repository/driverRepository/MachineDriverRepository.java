package burgerput.project.zenput.repository.driverRepository;

import org.openqa.selenium.WebDriver;

public class MachineDriverRepository {
    WebDriver driver;

    public WebDriver getDriver() {
        return driver;
    }

    public void setDriver(WebDriver driver) {
        this.driver = driver;
    }
}
