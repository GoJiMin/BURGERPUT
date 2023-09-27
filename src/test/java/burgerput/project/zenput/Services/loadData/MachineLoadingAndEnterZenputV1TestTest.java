package burgerput.project.zenput.Services.loadData;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@Slf4j
class MachineLoadingAndEnterZenputV1TestTest {

    @Test
    @DisplayName("정규표현식")
    public void regix() {
        String str = "최소 -140F 이상 *";
        String s = str.replaceAll("[a-zA-Z가-힣* ]", "");

        log.info("s={}", s);
    }
}