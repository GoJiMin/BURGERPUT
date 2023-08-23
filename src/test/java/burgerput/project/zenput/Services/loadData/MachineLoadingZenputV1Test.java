package burgerput.project.zenput.Services.loadData;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Map;
import java.util.regex.Pattern;

import static java.util.Collections.replaceAll;

@Slf4j
class MachineLoadingZenputV1Test {
    MachineLoadingZenput LoadMachinData = new MachineLoadingZenputV1();

    @Test
    @DisplayName("정규표현식")
    public void regix() {
        String str = "최소 -140F 이상 *";
        String s = str.replaceAll("[a-zA-Z가-힣* ]", "");

        log.info("s={}", s);
    }
}