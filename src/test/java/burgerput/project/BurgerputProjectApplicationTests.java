package burgerput.project;

import burgerput.project.zenput.Config;
import burgerput.project.zenput.Services.loadData.FoodLoadingZenput;
import burgerput.project.zenput.Services.loadData.MachineLoadingZenput;
import burgerput.project.zenput.domain.CustomMachine;
import burgerput.project.zenput.domain.Food;
import burgerput.project.zenput.domain.Machine;
import burgerput.project.zenput.repository.machineRepository.CustomMachineRepository;
import burgerput.project.zenput.repository.foodRepository.FoodRepository;
import burgerput.project.zenput.repository.machineRepository.MachineRepository;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@SpringBootTest
@Slf4j
@Import(Config.class)
@ContextConfiguration(classes = BurgerputProjectApplication.class)
class BurgerputProjectApplicationTests {



}
