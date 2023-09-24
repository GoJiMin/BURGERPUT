package burgerput.project.zenput.Services.loadData;

import burgerput.project.zenput.Services.loadData.zenputLoading.MachineLoadingAndEnterZenput;
import burgerput.project.zenput.Services.loadData.zenputLoading.MachineLoadingAndEnterZenputV1;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@Slf4j
class MachineLoadingAndEnterZenputV1Test {

    @Test
    @DisplayName("정규표현식")
    public void regix() {
        String str = "최소 -140F 이상 *";
        String s = str.replaceAll("[a-zA-Z가-힣* ]", "");

        log.info("s={}", s);
    }
}