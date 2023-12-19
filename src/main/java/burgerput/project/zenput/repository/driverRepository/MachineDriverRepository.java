package burgerput.project.zenput.repository.driverRepository;

import org.openqa.selenium.WebDriver;

public interface MachineDriverRepository {

    public WebDriver getDriver();

    public void setDriver(WebDriver driver);

}
