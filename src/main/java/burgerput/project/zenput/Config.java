package burgerput.project.zenput;

import burgerput.project.zenput.Services.loadData.FoodLoadingZenput;
import burgerput.project.zenput.Services.loadData.FoodLoadingZenputV1;
import burgerput.project.zenput.Services.printData.PrintData;
import burgerput.project.zenput.Services.printData.PrintDataV1;
import burgerput.project.zenput.Services.saveData.SaveData;
import burgerput.project.zenput.Services.saveData.SaveDataV1;
import burgerput.project.zenput.intercepter.checkSession.CheckSessionInterceptor;
import burgerput.project.zenput.repository.foodRepository.CustomFoodRepository;
import burgerput.project.zenput.repository.foodRepository.FoodRepository;
import burgerput.project.zenput.repository.machineRepository.CustomMachineRepository;
import burgerput.project.zenput.repository.machineRepository.MachineRepository;
import jakarta.persistence.EntityManager;
import org.springframework.context.annotation.Bean;
import burgerput.project.zenput.Services.loadData.MachineLoadingZenputV1;
import burgerput.project.zenput.Services.loadData.MachineLoadingZenput;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class Config implements WebMvcConfigurer {

    private final EntityManager em;

    public Config(EntityManager em) {
        this.em = em;
    }

    //Interceptor Settions===========================================

    @Bean
    public CheckSessionInterceptor checkSessionInterceptor() {
        return new CheckSessionInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(checkSessionInterceptor())
                .order(1)
                .addPathPatterns("/**")
                .excludePathPatterns( "/*.ico", "/error", "/loading", "/back/**", "/manifest.json", "/delCookie"
                ,"/index.html", "/static/**", "/logo/*","/logo192.png" );

    }

    // load machine list from zenput page
    @Bean
    public MachineLoadingZenput LoadMachine() {
        return new MachineLoadingZenputV1();
    }

    //load food list from zenput page
    @Bean
    public FoodLoadingZenput LoadFood() {
        return new FoodLoadingZenputV1();
    }

    //for memory DB Test Setting
//    @Bean
//    MemoryMachineRepository saveMachine() {
//        return new MemoryMachineRepositoryV1();
//    }

    //Save Data for the Saving data to DB
    @Bean
    SaveData saveData(MachineLoadingZenput machineLoadingZenput,
                      MachineRepository machineRepository,
                      FoodLoadingZenput foodLoadingZenput,
                      FoodRepository foodRepository,
                      CustomFoodRepository customFoodRepository,
                      CustomMachineRepository customMachineRepository) {
        return new SaveDataV1(machineLoadingZenput,
                machineRepository,
                foodLoadingZenput,
                foodRepository,
                customFoodRepository,
                customMachineRepository);
    }

    //PrintData for the Printing Json Data
    @Bean
    PrintData printData(MachineRepository machineRepository,
                        CustomMachineRepository customMachineRepository,
                        FoodRepository foodRepository,
                        CustomFoodRepository customFoodRepository) {
        return new PrintDataV1(machineRepository,
                customMachineRepository,
                foodRepository,
                customFoodRepository);
    }

}
